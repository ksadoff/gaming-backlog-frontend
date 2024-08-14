import {useState} from 'react';
import SubmitButton from "./SubmitButton";
import GameInstanceRequest from "../interfaces/GameInstanceRequest";
import Select from "react-select";
import {Platforms} from "../constants/Platforms";
import * as gameApi from "../api/gameApi";

interface PlatformOption {
    value: string,
    label: string
}

interface GameProps {
    id: string
}


const CustomFields = ({id}: GameProps) => {
    const [review, setReview] = useState<string>("")
    const [rating, setRating] = useState<string>("")
    const [ranking, setRanking] = useState<string>("")
    const [yearPlayed, setYearPlayed] = useState<string>("")
    const [yearReceived, setYearReceived] = useState<string>("")
    const [notes, setNotes] = useState<string>("")
    const [selectedPlatforms, setSelectedPlatforms] = useState<Array<string>>([])

    const updateFields = async ()  => {
        const updatedGame: GameInstanceRequest = {
            rating: handleNumberInput(rating),
            review: review,
            ranking: ranking,
            yearPlayed: handleNumberInput(yearPlayed),
            yearReceived: handleNumberInput(yearReceived),
            notes: notes,
            platformsOwnedOn: selectedPlatforms
        };
        await gameApi.updateGameInstance(id, updatedGame)
        alert("Successfully updated")
        window.location.reload()
    }

    const handleNumberInput = (numInput: string): number | undefined => {
        if (numInput === "") return undefined;
        return Number(numInput)
    }

    const getPlatforms = (): Array<PlatformOption> => {
        const platforms = Object.values(Platforms)
        return platforms.map((platform) => (
            {value: platform.toString(), label: platform.toString()}
        ))
    }

    return (
        <>
            <label>
                Rating:
                <input
                    type={"number"}
                    value={rating}
                    onChange={e => setRating(e.target.value)}
                />
            </label>
            <br />
            <label>
                Write a Review:
                <br />
                <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                rows={4}
                cols={40}
                />
            </label>
            <br />
            <label>
                Ranking:
                <input
                    value={ranking}
                    onChange={e => setRanking(e.target.value)}
                />
            </label>
            <br />
            <label>
                Year Played:
                <input
                    type={"number"}
                    value={yearPlayed}
                    onChange={e => setYearPlayed(e.target.value)}
                />
            </label>
            <br />
            <label>
                Year Received:
                <input
                    type={"number"}
                    value={yearReceived}
                    onChange={e => setYearReceived(e.target.value)}
                />
            </label>
            <br />
            <label>
                Add Notes:
                <br />
                <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={4}
                    cols={40}
                />
            </label>
            <br />
            <label>
                Select All Platforms Owned On:

                <Select
                    placeholder="Select Platforms"
                    isMulti
                    options={getPlatforms()}
                    onChange={(platforms) => setSelectedPlatforms(platforms.map(platform => platform.value))}
                />
            </label>
            <br />
            <br />
            <SubmitButton text={"Submit Custom Fields"} onClick={() => updateFields()}/>
        </>
    )
}
export default CustomFields;
