import { Options, Ora } from 'ora';
const ora = require('ora');

class Process {
  protected instance: Ora;
  public options?: Options;
  constructor(options?: Options) {
    this.instance = ora(options);
  }

  success() {
    this.instance.succeed();
  }

  loading() {
    this.instance.start();
  }

  error() {
    this.instance.fail();
  }
}

export default Process;
