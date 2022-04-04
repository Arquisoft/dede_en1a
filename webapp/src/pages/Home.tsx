import { Container } from 'react-bootstrap';
import ListProducts from "../components/listProducts/ListProducts";
import './styles.css';

const Home = () => {
    return (
        <Container className='mt-3 home' data-testid="productContainer">
            <ListProducts />
        </Container>
    )
}

export default Home;