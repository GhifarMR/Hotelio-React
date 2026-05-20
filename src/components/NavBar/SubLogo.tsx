interface Name {
  title?: string,
}

const Sublogo = ({title = ".com"}: Name) => (
  <div className="flex-1 cursor-pointer text-2xl font-semibold animate-sublogo pt-1 pb-1">
    <a href="/">{title}</a>
  </div>
);

export default Sublogo;