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
  it('renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log(wrapper.debug());
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('£50');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
    const img = wrapper.find('img');
    console.log(img.props());
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });
});
