import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';


describe('<Blog />', () => {
  let blog;

  beforeEach(async () => {
    const user = { username: 'John', name: 'John Snow' };
    blog = {
      title: 'Title',
      author: 'author',
      url: 'url',
      likes: 10,
      user: user,
      id: '82319483gh423h4924g2r'
    };
  });

  test('renders only title by default', () => {
    const { container } = render(
      <Blog
        blog={blog}
      />
    );
    expect(container.querySelector('#title')).toBeDefined();
    expect(container.querySelector('#url', '#author', '#likes')).toBeNull();
  });

  test('renders all the information about the blog when button is pressed', () => {
    const component = render(
      <Blog
        blog={blog}
      />
    );
    const button = component.getByText('View');
    fireEvent.click(button);

    expect(component.container.querySelector(
      '#title',
      '#url',
      '#author',
      '#likes')
    ).toBeDefined();

  });
});