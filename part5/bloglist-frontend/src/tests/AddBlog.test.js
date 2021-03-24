import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from '../components/AddBlog';

describe('<AddBlog />', () => {
  test('creates a new blog when passing valid data', async () => {
    const createFunction = jest.fn();
    const newBlog = {
      title: 'New blog post',
      author: 'Masa',
      url: 'www.masansivut.me'
    };

    const component = render(
      <AddBlog createBlogPost={createFunction} />
    );

    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const urlInput = component.container.querySelector('#url');
    const submitButton = component.getByText('Create');

    fireEvent.change(titleInput, {
      target: { value: newBlog.title }
    });
    fireEvent.change(authorInput, {
      target: { value: newBlog.author }
    });
    fireEvent.change(urlInput, {
      target: { value: newBlog.url }
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createFunction.mock.calls).toHaveLength(1);
    });
  });
});