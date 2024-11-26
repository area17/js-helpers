import listeners from './../src/listeners.js';

describe('listeners utility', () => {
    it('exists', () => {
        expect(typeof listeners).toBe('object');
        expect(typeof listeners.add).toBe('function');
        expect(typeof listeners.remove).toBe('function');
    });

    it('adds event listeners to buttons', () => {
      let count = 0;
      const handler = () => {
        count++;
      };
      const btn1 = document.createElement('button');
      const btn2 = document.createElement('button');
      const btn3 = document.createElement('button');

      document.body.appendChild(btn1);
      document.body.appendChild(btn2);
      document.body.appendChild(btn3);

      listeners.add(document.querySelectorAll('button'), 'click', handler);

      btn1.click();
      btn2.click();
      btn3.click();

      document.body.removeChild(btn1);
      document.body.removeChild(btn2);
      document.body.removeChild(btn3);

      expect(count).toBe(3);
    });

    it('removes event listeners from buttons', () => {
      let count = 0;
      const handler = () => {
        count++;
      };
      const btn1 = document.createElement('button');
      const btn2 = document.createElement('button');
      const btn3 = document.createElement('button');

      document.body.appendChild(btn1);
      document.body.appendChild(btn2);
      document.body.appendChild(btn3);

      listeners.add(document.querySelectorAll('button'), 'click', handler);

      btn1.click();
      btn2.click();
      btn3.click();

      listeners.remove(document.querySelectorAll('button'), 'click', handler);

      btn1.click();
      btn2.click();
      btn3.click();

      document.body.removeChild(btn1);
      document.body.removeChild(btn2);
      document.body.removeChild(btn3);

      expect(count).toBe(3);
    });
});
