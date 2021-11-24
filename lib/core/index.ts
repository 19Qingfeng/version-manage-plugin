import Process from '../utils/process';
import execa from 'execa';
import Sign from '../utils/signable';
import { Compilation, Compiler } from 'webpack';
import { generatorPackageJson, invalidValue } from '../utils/index';
import { ENV_VARIABLE, pluginName } from '../utils/constant';
import { validateParams } from '../utils/validate';

const inquirer = require('inquirer');

export interface Options {
  name: string;
  output: string;
  registry?: string;
  pckTemplate?: string;
}

// TODO: 预留pck实现
class VWebpackPlugin {
  public packageName: string;
  public output: string;
  public pckTemplate?: string;
  public registry?: string;
  private sign?: Sign;
  private inputPackageVersion: string;
  private originVersion: string;
  private autoContext: string | null;
  constructor(options: Options) {
    const {
      name,
      registry = 'http://registry.npmjs.org/',
      output,
      pckTemplate,
    } = options;
    // 初始化时进行参数校验
    validateParams(options, {
      name: pluginName,
      baseDataPath: `${pluginName}:options`,
    });
    this.packageName = name;
    this.registry = registry;
    this.output = output;
    this.pckTemplate = pckTemplate;
    this.originVersion = '';
    this.inputPackageVersion = '';
    this.sign = undefined;
    // 自动内容
    this.autoContext = null;
  }
  async apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      async (compilation: Compilation, callback) => {
        // 先解释版本升级
        Sign.logger();
        // 无论无核都要拉取最新的版本号 不使用npm version patch
        this.originVersion = await this.fetchOriginVersion();

        // 检查是否存在环境变量参数 存在的话则直接自动
        const manual = await this.processArgv();
        if (manual) {
          // 获得用户输入的版本号
          await this.askCustomizeVersion();
          // 移动packageJson
          await this.generatePck(compilation);
        }
        return callback();
      }
    );

    compiler.hooks.afterEmit.tap(pluginName, () => {
      if (!this.autoContext) {
        return;
      }
      this.autoUpdateVersion();
    });
  }

  // 询问开发者是否需要自定义版本号
  async askCustomizeVersion() {
    const { customVersion } = await inquirer.prompt({
      name: 'customVersion',
      type: 'confirm',
      message: 'Do you need a custom version number ?',
      default: false,
    });
    // 如果需要自定义版本 首先拉取远程版本内容
    if (customVersion) {
      const { inputCustomVersion } = await inquirer.prompt({
        name: 'inputCustomVersion',
        type: 'input',
        message: 'Please enter the custom version number ?',
      });
      this.inputPackageVersion = inputCustomVersion;
    } else {
      await this.autoUpdate();
    }
  }

  // 处理环境变量 返回true表示需要手动
  processArgv() {
    const argv = process.argv.slice(2);
    const enVariable = argv
      .filter((item) => item.indexOf(ENV_VARIABLE) !== -1)
      .map((item) => {
        const [key, value] = item.split('=');
        return {
          key,
          value,
        };
      })[0];
    if (enVariable) {
      const value = enVariable.value;
      // 判断是否合理
      invalidValue(value);
      // 通过获得对应值进行处理
      switch (value) {
        case 'patch':
          // 默认小版本号
          break;
        case 'minor':
          // 次版本号
          break;
        case 'major':
          // 大版本号
          break;
        case 'auto':
          return true;
      }
      console.log('自动处理');
      return false;
    }
    console.log('手动处理');
    return true;
  }

  // 自动升级流程
  async autoUpdate() {
    // 这里用list
    const { name } = await inquirer.prompt({
      name: 'name',
      type: 'list',
      choices: ['patch', 'minor', 'major'],
      default: ['patch'],
      message: 'Select the version of the version that needs to be modified.',
    });
    this.autoContext = name;
    this.inputPackageVersion = this.originVersion;
  }

  // 根据输入自动输入更新
  async autoUpdateVersion() {
    const autoContext = this.autoContext;
    this._runShell(`npm version ${autoContext}`, [], {
      cwd: this.output,
    });
  }

  // 生成package.json
  async generatePck(compilation: Compilation) {
    if (this.pckTemplate) {
      // 存在自定义的路径文件 将原始文件进行移动
      return;
    }
    // 移动完成之后 开始修改pck的版本号
    const source = generatorPackageJson(
      this.packageName,
      this.inputPackageVersion,
      this.registry
    );
    // @ts-ignore
    compilation.assets['package.json'] = {
      size: () => source.length,
      source: () => source,
      // buffer: () => new Buffer(8),
      // map: () => ({}),
      // sourceAndMap: () => ({ source: '', map: {} }),
      // updateHash: () => undefined,
    };
  }

  // 拉去远程版本号
  async fetchOriginVersion() {
    const packageName = this.packageName;
    const process = new Process({
      text: `fetch the latest version of ${packageName} ...`,
    });
    process.loading();
    const { stdout } = await this._runShell(
      `npm view ${this.packageName} version`
    );
    process.success();
    this.sign = new Sign(packageName, stdout);
    this.sign.version(`The latest version of ${packageName} is ${stdout}`);
    return stdout;
  }

  // 执行shell脚本
  async _runShell(
    shell: string,
    args: readonly string[] = [],
    options: execa.Options = {}
  ) {
    const innerArgs = [];
    if (this.registry) {
      innerArgs.push(...['--registry', this.registry]);
    }
    return await execa(shell, [...innerArgs, ...args], {
      ...options,
      shell: true,
    });
  }
}

export default VWebpackPlugin;
