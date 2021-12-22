import { default as signale, Signale } from 'signale';
import { pluginName } from './constant';

type SingType = 'version' | 'prerelease' | 'patch' | 'minor' | 'major';

class Sign {
  instance: signale.Signale<SingType>;
  constructor(scope: string = '', label: string = '') {
    const options = {
      disabled: false,
      interactive: false,
      logLevel: 'info',
      scope: scope,
      secrets: [],
      stream: process.stdout,
      types: {
        // 自定义
        version: {
          badge: '🔧',
          color: 'green',
          label, // 版本号
          logLevel: 'info',
        },
        // 主版本
        prerelease: {
          badge: '🔧',
          color: 'blue',
          label: 'prerelease-alpha',
          logLevel: 'info',
        },
        // 修订
        patch: {
          badge: '🔧',
          color: 'green',
          label: 'Patch',
          logLevel: 'info',
        },
        // 次版本
        minor: {
          badge: '🔧',
          color: 'green',
          label: 'Minor',
          logLevel: 'info',
        },
        // 主版本
        major: {
          badge: '🔧',
          color: 'green',
          label: 'Major',
          logLevel: 'info',
        },
      },
    };
    this.instance = new Signale(options);
  }

  version(text: string) {
    this.instance.version(text);
  }

  static logger() {
    const signale = new Sign(pluginName, 'Custom');
    signale.instance.version('支持自定义版本号，不推荐。');
    signale.instance.prerelease('内部测试先行版,用于非Master分支发布Npm。');
    signale.instance.patch('当进行向后兼容的缺陷修复时，则升级补丁版本。');
    signale.instance.minor('当以向后兼容的方式添加功能时，则升级次版本。');
    signale.instance.major('当进行不兼容的 API 更改时，则升级主版本。');
  }

  static success(text: string) {
    signale.success(text);
  }

  static error(text: string) {
    signale.error(text);
  }
}

export default Sign;
