import React, { useState } from "react";

export interface TreeItem {
  key: string;
  children: Array<TreeItem>;
}

interface TreeCheckboxItem {
  key: string;
  checked: boolean;
  indeterminate: boolean;
  children: Array<TreeCheckboxItem>;
}

const tree2treeCheckbox = (tree: Array<TreeItem>): Array<TreeCheckboxItem> => {
  return tree.map((treeItem) => {
    return {
      ...treeItem,
      checked: false,
      indeterminate: false,
      children: tree2treeCheckbox(treeItem.children),
    };
  });
};

export const getKeys = (tree: Array<TreeItem>): React.Key[] => {
  return tree.reduce((prev, item) => {
    return [...prev, item.key, ...getKeys(item.children)];
  }, [] as React.Key[]);
};

const updateTreeCheckbox = (treeCheckbox: Array<TreeCheckboxItem>) => {
  treeCheckbox.forEach((item) => {
    console.log(`in ${item.key} ${item.checked}`);
    let indeterminate = true;
    if (item.children.every((childItem) => childItem.checked)) {
      item.checked = true;
      indeterminate = false;
    }
    if (item.children.every((childItem) => !childItem.checked)) {
      item.checked = false;
      indeterminate = false;
    }
    item.indeterminate = indeterminate;
    updateTreeCheckbox(item.children);
  });
};

const findTreeCheckbox = (
  treeCheckbox: Array<TreeCheckboxItem>,
  keyToFind: string,
  onFound: (item: TreeCheckboxItem) => void
) => {
  treeCheckbox.forEach((item) => {
    if (item.key === keyToFind) {
      onFound(item);
    }
    findTreeCheckbox(item.children, keyToFind, onFound);
  });
};

/** @deprecated */
export const useTreeCheckbox = (tree: Array<TreeItem>) => {
  console.log(tree);
  console.log(tree2treeCheckbox(tree));

  const result = tree2treeCheckbox(tree);
  const [treeCheckbox, setTreeCheckbox] = useState(result);
  console.log(treeCheckbox);

  const setCheckState = (key: string, state: boolean) => {
    console.log(key, state);
    const treeCheckboxClone = [...treeCheckbox];
    findTreeCheckbox(treeCheckboxClone, key, (item) => (item.checked = state));
    updateTreeCheckbox(treeCheckboxClone);
    setTreeCheckbox(treeCheckboxClone);
  };

  const getCheckState = (key: string) => {
    let checked: boolean | undefined;
    let indeterminate: boolean | undefined;
    findTreeCheckbox(treeCheckbox, key, (item) => {
      checked = item.checked;
      indeterminate = item.indeterminate;
    });
    return { checked, indeterminate };
  };

  return { getCheckState, setCheckState };
};
