function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking learning', () => {
  it('mocks a regular function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person', () => {
    const me = new Person('David', ['pizza', 'pasta']);
    expect(me.name).toBe('David');
  });

  it('can fetch foods', async () => {
    const me = new Person('David', ['pizza', 'pasta']);
    // mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const favFoods = await me.fetchFavFoods();
    // console.log(favFoods);
    expect(favFoods).toContain('sushi');
  });
});
