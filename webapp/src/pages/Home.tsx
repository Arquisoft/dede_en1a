import { Container } from 'react-bootstrap';
import ListProducts from "../components/listProducts/ListProducts";
import './styles.css';

const Home = () => {
    return (
        <Container className='mt-3 home'>
            <ListProducts />
        </Container>
    )
}

export default Home;