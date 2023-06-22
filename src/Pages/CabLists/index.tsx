import { put$getCabsByType } from "../../API/cabs";

export const CabLists = () => {
    const type = {type: "4"}
    put$getCabsByType(type).then((data) => {
        console.log(data)
    })

    return (
        <div>index</div>
    )
}
