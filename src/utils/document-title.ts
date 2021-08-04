import { useEffect, useRef } from "react";

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = false
) => {
  const lastTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = lastTitle;
      }
    };
  }, [lastTitle, keepOnUnmount]);
};
