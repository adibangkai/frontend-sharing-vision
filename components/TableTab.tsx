"use client";

import { ArticleProps } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import DashTable from "./DashTable";

interface TabProps {
  published: ArticleProps[];
  drafted: ArticleProps[];
  trashed: ArticleProps[];
}
export default function TableTab({ published, drafted, trashed }: TabProps) {
  return (
    <div className="w-full px-2 py-4 sm:px-0">
      <Tab.Group>
        <div className="grid items-center">
          <Tab.List className="tabs mt-4 mb-0 mx-auto">
            <Tab
              className={({ selected }) =>
                clsx("tab tab-bordered", selected && "tab-active")
              }
            >
              Publish
            </Tab>
            <Tab
              className={({ selected }) =>
                clsx("tab tab-bordered", selected && "tab-active")
              }
            >
              Draft
            </Tab>{" "}
            <Tab
              className={({ selected }) =>
                clsx("tab tab-bordered", selected && "tab-active")
              }
            >
              Trash
            </Tab>
          </Tab.List>
        </div>
        <button>
          <Link
            href={"/dashboard/add-new"}
            className="hover:opacity-60 flex rounded-xl px-3 "
          >
            + Tambah Artikel
          </Link>
        </button>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <DashTable data={published} />
          </Tab.Panel>
          <Tab.Panel>
            <DashTable data={drafted} />
          </Tab.Panel>
          <Tab.Panel>
            <DashTable data={trashed} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
