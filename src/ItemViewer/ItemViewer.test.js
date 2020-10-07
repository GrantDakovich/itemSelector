import React from 'react';

import { configure, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

import ItemViewer from './ItemViewer'

configure({adapter: new Adapter()});

describe("<ItemViewer />", () => {


	it("should render an Input div", () => {
		const wrapper = mount(<ItemViewer />);
		expect(wrapper.find('input')).to.have.lengthOf(1);
	});

	it("should render a Button div", () => {
		const wrapper = mount(<ItemViewer />);
		expect(wrapper.find('button')).to.have.lengthOf(1);
	});


	it("should state 'searchWord' should change on input and submission", () => {
		const wrapper = mount(<ItemViewer />);
		const input = wrapper.find('input');
		expect(input.length).to.equal(1);
		input.simulate('change', { target: { value: 'a' } })

		wrapper.find('button').simulate('click');
		console.log(wrapper.find("ItemDisplay").props());
		expect(wrapper.find("ItemDisplay").props()).to.have.property('searchWord', "a");

			

	});

	



});






































