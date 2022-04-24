import React from 'react';
import { render } from '@testing-library/react';
import CartFooter from '../components/cartFooter/CartFooter';

test("Footer matches snapshot", () => {
    const fakeForm = render(<CartFooter setIsInCheckout={() => false}/>);
    expect(fakeForm).toMatchSnapshot();
})