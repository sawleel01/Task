interface ElementProps {
  element: number;
}

const Elements: React.FC<ElementProps> = ({ element }) => {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center text-6xl font-bold border border-gray-300">
      {element}
    </div>
  );
};

export default Elements;
