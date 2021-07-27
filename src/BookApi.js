import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

/*
 * Abstracts away both needs for api calls,
 * on rendering and on events / conditions
 *
 * useBookApi, hook, default export
 * bookApi, normal function
 *
 */

/*
 * Useful for http data as a dependency in rendering
 *
 * @param method [string], http method
 * @param path [string], relative path to baseUrl
 * @param bodyData [object]
 * @return, Response Data
 */
export default function useBookApi(method, path) {
  const [data, setData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    bookApi(method, path, (dataOrError) =>
      dataOrError instanceof Error ? history.push("/404") : setData(dataOrError)
    );
  }, [method, path, history]);

  return data;
}

/*
 * Useful for calls on events or in condition
 *
 * @param method [string], http method
 * @param path [string], relative path to baseUrl
 * @param data [function], callback, gets `response.data` as an argument
 * @param data [object], body data
 */
export function bookApi(method, path, callback, data = {}) {
  const baseUrl = "https://api3.angular-buch.com";

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    data,
  })
    .then((response) => callback(response.data))
    .catch((error) => callback(error));
}
