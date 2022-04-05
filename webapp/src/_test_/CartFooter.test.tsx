import React from 'react';
import { render } from '@testing-library/react';
import CartFooter from '../components/cartFooter/CartFooter';

test("Footer matches snapshot", () => {
    const fakeForm = render(<CartFooter />);
    expect(fakeForm).toMatchSnapshot();
})