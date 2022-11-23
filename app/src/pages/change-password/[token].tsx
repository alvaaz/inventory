import React from "react";
import { NextPage } from "next";
import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import router from "next/router";
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Cambia tu contraseña
          </h2>
        </div>
        <Formik
          initialValues={{
            newPassword: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            // const response = await login({
            //   variables: {
            //     options: values,
            //   },
            // });
            // if (response.data?.login.errors) {
            //   const errorMap: Record<string, string> = {};
            //   response.data.login.errors.forEach(({ field, message }) => {
            //     errorMap[field] = message;
            //   });
            //   setErrors(errorMap);
            // } else if (response.data?.login.user) {
            //   console.log(response.data.login.user);
            //   if (typeof router.query.next === "string") {
            //     router.push(router.query.next);
            //   } else {
            //     router.push("/inventory");
            //   }
            // }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Nueva contraseña
                    </label>
                    <Field
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Nueva contraseña"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cambiar contraseña
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

ChangePassword.getInitialProps = async ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
