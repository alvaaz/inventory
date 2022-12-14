import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Dispatch, SetStateAction, useEffect } from "react";
import { actions } from "../../reducers";
import {
  Item,
  Exact,
  BrandsQuery,
  CategoriesQuery,
} from "../../generated/graphql";
import CreatableSelect from "react-select/creatable";
import { QueryLazyOptions } from "@apollo/client";

const transformData = (
  data: Array<Item>
): {
  value: string;
  label: string;
}[] => {
  return data?.map((item: Item) => ({
    value: item.id as string,
    label: item.name as string,
  }));
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLDivElement>) => void;
  dispatch: Dispatch<any>;
  code: any;
  name: string;
  handleChange: (e: any) => void;
  categoryData: CategoriesQuery | undefined;
  getCategories: () => void;
  getBrands: () => void;
  dataBrand: BrandsQuery | undefined;
  createBrand: (options?: any) => Promise<any>;
  createItemLoading: boolean;
  createCategory: (options?: any) => Promise<any>;
  categoryLoading: boolean;
  brandLoading: boolean;
  createCategoryLoading: boolean;
  createBrandLoading: boolean;
  brand: {
    value: string;
    label: string;
  } | null;
  model: string;
  category: {
    value: string;
    label: string;
  } | null;
  description: string;
};

export const CreateArticleModal = ({
  open,
  setOpen,
  handleSubmit,
  dispatch,
  code,
  name,
  handleChange,
  getBrands,
  dataBrand,
  createBrand,
  createItemLoading,
  category,
  brand,
  model,
  description,
  categoryLoading,
  brandLoading,
  createCategoryLoading,
  createBrandLoading,
  getCategories,
  categoryData,
  createCategory,
}: Props) => {
  useEffect(() => {
    getBrands();
  }, [dataBrand]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onSubmit={handleSubmit}
            >
              {code ? (
                <div className="px-4 py-5 bg-white sm:p-6 text-center">
                  <svg
                    width="49"
                    height="48"
                    viewBox="0 0 49 48"
                    className="inline-block mb-2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="24.5" cy="24" r="24" fill="#D9F9E6" />
                    <path
                      d="M18.2071 24.7929C17.8166 24.4024 17.1834 24.4024 16.7929 24.7929C16.4024 25.1834 16.4024 25.8166 16.7929 26.2071L18.2071 24.7929ZM21 29L20.2929 29.7071C20.6834 30.0976 21.3166 30.0976 21.7071 29.7071L21 29ZM31.7071 19.7071C32.0976 19.3166 32.0976 18.6834 31.7071 18.2929C31.3166 17.9024 30.6834 17.9024 30.2929 18.2929L31.7071 19.7071ZM16.7929 26.2071L20.2929 29.7071L21.7071 28.2929L18.2071 24.7929L16.7929 26.2071ZM21.7071 29.7071L31.7071 19.7071L30.2929 18.2929L20.2929 28.2929L21.7071 29.7071Z"
                      fill="#43936C"
                    />
                  </svg>
                  <h2 className="text-lg mb-4">Artículo creado</h2>
                  <h2 className="font-mono text-gray-900 mb-5 bg-gray-100 rounded-lg inline-block py-2 px-3 border-2 border-gray-200 ">
                    {code}
                  </h2>
                  <p className="text-sm	text-gray-500 mb-4">
                    Este es el código. Pegalo en el artículo para llevar un
                    registro.
                  </p>
                  <button
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => {
                      dispatch({
                        type: actions.reset,
                      });
                      setOpen(false);
                    }}
                  >
                    <span>Volver al inventario</span>
                  </button>
                </div>
              ) : (
                <form className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          id="name"
                          value={name}
                          onChange={handleChange}
                          autoComplete="name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="brand"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Marca
                        </label>
                        <CreatableSelect
                          options={transformData(dataBrand?.brands as Item[])}
                          onFocus={getBrands}
                          isDisabled={createBrandLoading}
                          placeholder="Selecciona una marca..."
                          isLoading={brandLoading || createBrandLoading}
                          loadingMessage={() => "Cargando marcas"}
                          onChange={(option: any) => {
                            dispatch({
                              type: actions.selectChanged,
                              fieldName: "brand",
                              payload: {
                                value: option.value,
                                label: option.label,
                              },
                            });
                          }}
                          onCreateOption={(inputValue) => {
                            createBrand({
                              variables: {
                                name: inputValue,
                              },
                            }).then((data) => {
                              dispatch({
                                type: actions.fieldsChanged,
                                fieldName: "brand",
                                payload: {
                                  value: data!.data!.createBrand!.id,
                                  label: data!.data!.createBrand!.name,
                                },
                              });
                            });
                          }}
                          value={brand}
                        ></CreatableSelect>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="model"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Modelo
                        </label>
                        <input
                          required
                          type="text"
                          name="model"
                          id="model"
                          value={model}
                          onChange={handleChange}
                          autoComplete="model"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Categoría
                        </label>
                        <CreatableSelect
                          options={transformData(
                            categoryData?.categories as Item[]
                          )}
                          onFocus={getCategories}
                          isDisabled={createCategoryLoading}
                          placeholder="Selecciona una categoría..."
                          loadingMessage={() => "Cargando categorías"}
                          isLoading={categoryLoading || createCategoryLoading}
                          onChange={(option: any) => {
                            dispatch({
                              type: actions.selectChanged,
                              fieldName: "category",
                              payload: {
                                value: option.value,
                                label: option.label,
                              },
                            });
                          }}
                          onCreateOption={(inputValue) => {
                            createCategory({
                              variables: {
                                name: inputValue,
                              },
                            }).then((data) => {
                              dispatch({
                                type: actions.fieldsChanged,
                                fieldName: "category",
                                payload: {
                                  value: data!.data!.createCategory!.id,
                                  label: data!.data!.createCategory!.name,
                                },
                              });
                            });
                          }}
                          value={category}
                        ></CreatableSelect>
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Observaciones
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="Esta dañado en su..."
                            value={description}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Una descripción corta del artículo, si presenta alguna
                          falla o si viene con algún accesorio.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={createItemLoading}
                      className={`relative w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white ${
                        createItemLoading ? "loading" : null
                      } hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm`}
                    >
                      <div className="spinner" />
                      <span>Crear</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
