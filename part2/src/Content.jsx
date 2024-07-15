import {Part} from './Part';

export const Content = ({ parts }) => {
    //console.log({Content})

    if (parts === "undefined") {
        return <p>No parts available</p>;
    }

    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
}