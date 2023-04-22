const createList = require('./createList');
  describe('createList', ()=>{
    it('creates an li element with class "item" and a span tag with class "item-text"', () => {
        const valueList = "Test";
        const list = createList(valueList);        
        expect(list.tagName).toBe("LI");        
        expect(list.classList.contains("item")).toBe(true);        
        expect(list.querySelector("span")).toBeTruthy();        
        expect(list.querySelector("span").classList.contains("item-text")).toBe(true);
    });
    it('creates an li element with the text provided as a parameter', () => {
        const valueList = "Test";
        const list = createList(valueList);        
        expect(list.querySelector("span").innerText).toBe(valueList);
    });
});
