import * as gameApi from "../../../api/gameApi";
import GameInstanceRequest from "../../../interfaces/GameInstanceRequest";
import {fireEvent, render, screen, act, waitFor} from '@testing-library/react';
import CustomFields from "../../../components/CustomFields";
import selectEvent from "react-select-event";

describe('Rendering Custom Fields', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const updateGameStub = jest.spyOn(gameApi, 'updateGameInstance');
    const reloadFn = () => {
        window.location.reload();
    };
    const original = window.location;

    const setup = async () => {
        updateGameStub.mockImplementation((id: string, updatedGame: GameInstanceRequest): Promise<string> => {

            return Promise.resolve("did it")
        })
        await act(async () => {
            render(
                <CustomFields id={"testID"}/>
            )
        })
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
        });
    }

    beforeEach(async () => {
        await setup()
    })

    afterEach(async () => {
        Object.defineProperty(window, 'location', { configurable: true, value: original });
    })

    it('Renders Rating input', () => {
        const text = screen.getByText(/Rating:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Review input', () => {
        const text = screen.getByText(/Write a Review:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Ranking input', () => {
        const text = screen.getByText(/Ranking:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Year Played input', () => {
        const text = screen.getByText(/Year Played:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Year Received input', () => {
        const text = screen.getByText(/Year Received:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Notes input', () => {
        const text = screen.getByText(/Add Notes:/i);
        expect(text).toBeInTheDocument();
    })

    it('Renders Platforms Owned On:', () => {
        const text = screen.getByText(/Select All Platforms Owned On:/i);
        expect(text).toBeInTheDocument();
    })

    it('Handles updates to state', async () => {
        const ratingInput = screen.getByLabelText(/Rating:/i);
        fireEvent.change(ratingInput, { target: { value: '10' } });
        expect(ratingInput).toHaveValue(10);

        const reviewTextArea = screen.getByLabelText(/Write a Review:/i);
        fireEvent.change(reviewTextArea, { target: { value: '10/10 would suffer again' } });
        expect(reviewTextArea).toHaveValue('10/10 would suffer again');

        const rankingInput = screen.getByLabelText(/Ranking:/i);
        fireEvent.change(rankingInput, { target: { value: '1' } });
        expect(rankingInput).toHaveValue('1');

        const yearPlayedInput = screen.getByLabelText(/Year Played:/i);
        fireEvent.change(yearPlayedInput, { target: { value: '2024' } });
        expect(yearPlayedInput).toHaveValue(2024);

        const yearReceivedInput = screen.getByLabelText(/Year Received:/i);
        fireEvent.change(yearReceivedInput, { target: { value: '2020' } });
        expect(yearReceivedInput).toHaveValue(2020);

        const notesTextArea = screen.getByLabelText(/Add Notes:/i);
        fireEvent.change(notesTextArea, { target: { value: 'On Steam' } });
        expect(notesTextArea).toHaveValue('On Steam');

        const selectInput = screen.getByLabelText(/Select All Platforms Owned On:/i).parentElement?.querySelector('input');
        expect(selectInput).toBeInTheDocument();

        await selectEvent.select(selectInput as HTMLElement, ['Nintendo Switch', 'Nintendo 3DS']);


        const submitButton = screen.getByText('Submit Custom Fields');
        fireEvent.click(submitButton);
        await waitFor(() => {
            expect(updateGameStub).toHaveBeenCalledWith("testID", {
                rating: 10,
                review: "10/10 would suffer again",
                ranking: "1",
                yearPlayed: 2024,
                yearReceived: 2020,
                notes: "On Steam",
                platformsOwnedOn: ["Nintendo Switch", "Nintendo 3DS"]
            })
            expect(window.alert).toHaveBeenCalledWith('Successfully updated');
            expect(window.location.reload).toHaveBeenCalled();
        })
    })
})