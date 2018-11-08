import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC',
  title: 'cool item',
  price: '5000',
  description: 'a cool item description',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg'
};

describe('<Item />', () => {
  it('renders the image properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders priceTag and title properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    // console.log(wrapper.debug());
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('£50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const buttonList = wrapper.find('.buttonList');
    // console.log(buttonList.debug());
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(1);
    expect(buttonList.find('Link').exists()).toBe(true);
    expect(buttonList.find('Link').exists()).toBeTruthy();
    expect(buttonList.find('AddToCart').exists()).toBeTruthy();
    expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
  });
});
