interface titleBox {
    title: string;
}

const FilterTitle = ({title}: titleBox) => {
    return (
        <h3 className="font-semibold text-lg">{title}</h3>
    )
}

export default FilterTitle;