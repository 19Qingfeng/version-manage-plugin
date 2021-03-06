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
        // èªå®ä¹
        version: {
          badge: 'ð§',
          color: 'green',
          label, // çæ¬å·
          logLevel: 'info',
        },
        // ä¸»çæ¬
        prerelease: {
          badge: 'ð§',
          color: 'blue',
          label: 'prerelease-alpha',
          logLevel: 'info',
        },
        // ä¿®è®¢
        patch: {
          badge: 'ð§',
          color: 'green',
          label: 'Patch',
          logLevel: 'info',
        },
        // æ¬¡çæ¬
        minor: {
          badge: 'ð§',
          color: 'green',
          label: 'Minor',
          logLevel: 'info',
        },
        // ä¸»çæ¬
        major: {
          badge: 'ð§',
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
    signale.instance.version('æ¯æèªå®ä¹çæ¬å·ï¼ä¸æ¨èã');
    signale.instance.prerelease('åé¨æµè¯åè¡ç,ç¨äºéMasteråæ¯åå¸Npmã');
    signale.instance.patch('å½è¿è¡ååå¼å®¹çç¼ºé·ä¿®å¤æ¶ï¼ååçº§è¡¥ä¸çæ¬ã');
    signale.instance.minor('å½ä»¥ååå¼å®¹çæ¹å¼æ·»å åè½æ¶ï¼ååçº§æ¬¡çæ¬ã');
    signale.instance.major('å½è¿è¡ä¸å¼å®¹ç API æ´æ¹æ¶ï¼ååçº§ä¸»çæ¬ã');
  }

  static success(text: string) {
    signale.success(text);
  }

  static error(text: string) {
    signale.error(text);
  }
}

export default Sign;
