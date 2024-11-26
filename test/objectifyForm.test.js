import objectifyForm from './../src/objectifyForm.js';

const setUpHtml = () => {
  const div = document.createElement('div');
  div.innerHTML = `
  <form id='form'>
    <label for='name'>Name</label>
    <input type='text' id='name' name='name' value='Mike'>
    <label for='description'>Description</label>
    <textarea id='description' name='description'>Interface Engineer</textarea>
    <label><input type='radio' name='role' value='FE' checked> FE</label>
    <label><input type='radio' name='role' value='BE'> BE</label>
    <label><input type='checkbox' name='staff' value='staff' checked> Staff</label>
    <label for="mySelect">my select</label>
    <select id="mySelect" name="mySelect">
      <option value="incorrectValue">test1</option>
      <option selected value="test">test1</option>
    </select>
  </form>
      `;
  return div;
};

describe('objectifyForm utility', () => {
  it('exists', () => {
    expect(typeof objectifyForm).toBe('function');
  });

  it('works', () => {
    const container = setUpHtml();
    const form = container.querySelector('form');
    const data = objectifyForm(form);
    const expectedData = {
      name: 'Mike',
      description: 'Interface Engineer',
      role: 'FE',
      staff: 'staff',
      mySelect: 'test',
    };
    expect(data).toEqual(expectedData);
  });
});
