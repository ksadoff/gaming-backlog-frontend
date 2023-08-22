import React from 'react';
import { render, screen } from '@testing-library/react';
import GameInstancePage  from '../../../pages/GameInstancePage';
import * as gameApi from '../../../api/gameApi';
import GameInstance from "../../../interfaces/GameInstance";

describe('Rendering GameInstancePage', () => {
    let mockGame: GameInstance = {
        images: ["img"],
        name: "Fire Emblem: Three Houses",
        platforms: ["Nintendo Switch"],
        genres: ["RPG"],
        franchises: ["Fire Emblem"],
        companies: ["Nintendo", "Intelligent Systems"],
        releaseDate: ["July 26 2019"],
        summary: "so many houses",
        rating: 10,
        review: "Blue Lions >>>",
        ranking: "5",
        yearPlayed: 2019,
        yearReceived: 2019,
        notes: "i want to replay this game for a fifth time please stop me",
        platformsOwnedOn: ["Nintendo Switch"]
    }

    let setup = () => {
        const mockGetGame = jest.spyOn(gameApi, 'getGameInstance')
        mockGetGame.mockResolvedValue(mockGame)
        render(<GameInstancePage gameId="test" />);
    }

    beforeEach(() => {
        setup()
    })

    it('renders game title', async () => {
        const title = await screen.findByText(/Fire Emblem: Three Houses/);
        expect(title).toBeInTheDocument();
    })

    it('renders platforms', async () => {
        const platform = await screen.findAllByText(/Nintendo Switch/);
        expect(platform[0]).toBeInTheDocument();
    })

    it('renders genres', async () => {
        const genre1 = await screen.findByText(/RPG/);
        expect(genre1).toBeInTheDocument();
    })

    it('renders franchises', async () => {
        const franchise = await screen.findAllByText(/Fire Emblem/);
        expect(franchise[1]).toBeInTheDocument();
    })

    it('renders companies', async () => {
        const company = await screen.findAllByText(/Nintendo/);
        expect(company[1]).toBeInTheDocument();
    })

    it('renders release date', async () => {
        const date = await screen.findByText(/July 26 2019/);
        expect(date).toBeInTheDocument();
    })

    it('renders summary', async () => {
        const summary = await screen.findByText(/so many houses/i);
        expect(summary).toBeInTheDocument();
    })

    it('renders image', async () => {
        const image = await screen.findByAltText("Game")
        expect(image).toBeInTheDocument();
    })

    it('renders rating', async () => {
        const rating = await screen.findByText(/10/)
        expect(rating).toBeInTheDocument()
    })

    it('renders review', async () => {
        const review = await screen.findByText(/Blue Lions >>>/)
        expect(review).toBeInTheDocument()
    })

    it('renders ranking', async () => {
        const ranking = await screen.findByText(/5/)
        expect(ranking).toBeInTheDocument()
    })

    it('renders yearPlayed', async () => {
        const yearPlayed = await screen.findAllByText(/2019/)
        expect(yearPlayed[1]).toBeInTheDocument()
    })

    it('renders yearReceived', async () => {
        const yearReceived = await screen.findAllByText(/2019/)
        expect(yearReceived[2]).toBeInTheDocument()
    })

    it('renders notes', async () => {
        const notes = await screen.findByText(/i want to replay this game for a fifth time please stop me/)
        expect(notes).toBeInTheDocument()
    })

    it('renders platformsOwnedOn', async () => {
        const platform = await screen.findAllByText(/Nintendo Switch/);
        expect(platform[1]).toBeInTheDocument();
    })

});
