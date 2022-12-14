import { ReactElement, useState, useEffect, useRef } from "react";
import Layout from "../components/layout";
import { Table } from "../components/table";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { useCategoriesQuery } from "../generated/graphql";
import { useModal } from "../components/Modal2";
import { createPortal } from "react-dom";

type Position = {
  x: number;
  y: number;
};

const columns = [
  { key: 0, title: "Nombre" },
  { key: 3, title: "Fecha incorporación" },
  { key: 4, title: "Última modificación" },
  { key: 4, title: "" },
];

let howMuchMounter = 0;

function Overlay({ children, position }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<Element | null>(null);
  let modalRoot;

  useEffect(() => {
    ref.current = document.querySelector("#modal-root");
  }, []);

  if (!ref.current) return null;

  return ref.current ? (
    createPortal(
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        }}
      >
        {children}
      </div>,
      ref.current
    )
  ) : (
    <h1>nada</h1>
  );
}

function Categories() {
  const [position, setPosition] = useState<Position | null>({ x: 0, y: 0 });
  const { data } = useCategoriesQuery({
    pollInterval: 60000,
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setPosition({
      x: e.currentTarget.getBoundingClientRect().x,
      y: e.currentTarget.getBoundingClientRect().y,
    });
  };

  const dataCategories = data ? data.categories : [];

  const rows = dataCategories.map((category) => (
    <tr
      className="cursor-pointer hover:bg-gray-50"
      key={category.id}
      id={category.id as string}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {category.name}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div
          className="w-8 h-6 border border-green-300"
          onClick={(e) => handleClick(e)}
        >
          <DotsHorizontalIcon
            className="w-5 h-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <main>
      <Overlay position={position}>
        <h1>Hola</h1>
      </Overlay>
      <Table rows={rows} columns={columns} />
    </main>
  );
}

export default Categories;

Categories.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Inventario">{page}</Layout>;
};
