import {render} from "@testing-library/react";
import SearchBar from "../../../components/SearchBar";


describe('SearchBar Component', () => {
    it('renders search button', () => {
        const {getByRole} = render(<SearchBar/>);

        expect(getByRole('button', {name: 'Submit Search'})).toBeInTheDocument();
    });

    it('renders search bar', () => {
        const {getByPlaceholderText} = render(<SearchBar/>);

        expect(getByPlaceholderText("Search games...")).toBeInTheDocument();
    })
})