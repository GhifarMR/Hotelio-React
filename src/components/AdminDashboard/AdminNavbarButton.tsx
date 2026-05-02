
interface content {
    source: string,
    name: string,
}


const AdminNavbarButton = ({source, name} : content) => {
  return (
    <div>
      <a
        href={source}
        className="text-black border-black px-2 py-2 rounded-lg cursor-pointer"
      >
        {name}
      </a>
    </div>
  );
};

export default AdminNavbarButton;
