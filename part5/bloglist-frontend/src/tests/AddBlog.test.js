import React from 'react';
import { render, fireEvent, waitFor, prettyDOM } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from '../components/AddBlog';
import InfoBox from '../UI/InfoBox';

describe('<AddBlog />', () => {
  let createFunction,
    titleInput,
    urlInput,
    authorInput,
    submitButton,
    component;

  beforeEach(() => {
    createFunction = jest.fn();
    component = render(
      <AddBlog createBlogPost={createFunction} />
    );

    titleInput = component.container.querySelector('#title');
    authorInput = component.container.querySelector('#author');
    urlInput = component.container.querySelector('#url');
    submitButton = component.getByText('Create');
  });

  test('creates a new blog when passing valid data', async () => {
    const newBlog = {
      title: 'New blog post',
      author: 'Masa',
      url: 'www.masansivut.me'
    };

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

  test('too short title resolves in error message for the user', async () => {
    const infoText = { message: '', status: 'error' };
    const { container } = render(
      <InfoBox infoText={infoText} />
    );
    const newBlog = {
      title: 'New',
      author: 'Masa',
      url: 'www.masansivut.me'
    };

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
      const infoMessageDiv = container.querySelector('#infoMessageDiv');
      expect(infoMessageDiv).toBeDefined();
    });
  });
});