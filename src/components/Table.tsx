import * as React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

enum PullsUnit {
  Docker = "docker pulls per Month",
  Nuget = "nuget",
  Npm = "npm",
}

enum Languages {
  CSharp = "csharp",
  Java = "java",
  Python = "python",
  JavaScript = "javascript",
  TypeScript = "typescript",
  Go = "go",
  Rust = "rust",
  PHP = "php",
  Ruby = "ruby",
}

enum FeaturePrefix {
  Simplicity = "si",
  Reliability = "r",
  Scalability = "sc",
  Durability = "d",
}

const SimplicityFeatures = {
  Integrations: `${FeaturePrefix.Simplicity}:integrations`,
  VisualizeFlow: `${FeaturePrefix.Simplicity}:visualize-flow`,
  ReusableWorkflows: `${FeaturePrefix.Simplicity}:reusable-workflows`,
};

const ReliabilityFeatures = {
  Observability: `${FeaturePrefix.Reliability}:observability`,
  QueryableState: `${FeaturePrefix.Reliability}:queryable-state`,
  Transactions: `${FeaturePrefix.Reliability}:transactions`,
};

const ScalabilityFeatures = {
  SeperateComputeNodes: `${FeaturePrefix.Scalability}:seperate-compute-nodes`,
};

const DurabilityFeatures = {
  Sleep: `${FeaturePrefix.Durability}:sleep`,
};

const PrefixColorMap = {
  lr: "orange",
  r: "red",
  sc: "blue",
  s: "green",
  t: "purple",
};

const Features = {
  ...SimplicityFeatures,
  ...ScalabilityFeatures,
  ...DurabilityFeatures,
  ...ReliabilityFeatures,
};

type FeatureKeys = keyof typeof Features;
type FeatureValues = (typeof Features)[FeatureKeys];

type WorkflowEngine = {
  githubStars: number;
  pulls: number;
  pullsUnit: PullsUnit;
  name: string;
  features: FeatureValues[];
  languages: Languages[];
};

const defaultData2: WorkflowEngine[] = [
  {
    githubStars: 1000,
    pulls: 100,
    pullsUnit: PullsUnit.Docker,
    name: "Temporal",
    features: [
      SimplicityFeatures.Integrations,
      SimplicityFeatures.ReusableWorkflows,
      ReliabilityFeatures.Observability,
      ReliabilityFeatures.QueryableState,
      ScalabilityFeatures.SeperateComputeNodes,
      ReliabilityFeatures.Transactions,
      DurabilityFeatures.Sleep,
    ],
    languages: [
      Languages.Java,
      Languages.Go,
      Languages.Python,
      Languages.JavaScript,
      Languages.TypeScript,
    ],
  },
  {
    githubStars: 1000,
    pulls: 100,
    pullsUnit: PullsUnit.Docker,
    name: "N8N",
    features: [
      SimplicityFeatures.Integrations,
      SimplicityFeatures.VisualizeFlow,
      ReliabilityFeatures.Observability,
      ReliabilityFeatures.QueryableState,
      ScalabilityFeatures.SeperateComputeNodes,
      ReliabilityFeatures.Transactions,
      DurabilityFeatures.Sleep,
    ],
    languages: [Languages.JavaScript, Languages.TypeScript],
  },
];

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<WorkflowEngine>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("githubStars", {
    header: () => "Popularity",
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor("pulls", {
    header: () => <span>Usage</span>,
    cell: info => `${info.row.original.pulls} ${info.row.original.pullsUnit}`,
  }),
  columnHelper.accessor("features", {
    header: "Features",
    cell: info => (
      <div className="flex flex-row flex-wrap">
        {info.getValue().map(feature => (
          <div
            className={`m-1 rounded-full border-2 p-1 px-2 bg-${
              PrefixColorMap[feature.split(":").at(0) ?? "default"]
            }-200`}
          >
            {feature + feature.split(":").at(0)}
          </div>
        ))}
      </div>
    ),
  }),
  columnHelper.accessor("languages", {
    header: "Languages",
    cell: info => (
      <div className="flex flex-row flex-wrap">
        {info.getValue().map(language => (
          <div className="m-1 rounded-full border-2 p-1 px-2">{language}</div>
        ))}
      </div>
    ),
  }),
];

export default function Table() {
  const [data, setData] = React.useState(() => [...defaultData2]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="my-2 rounded-xl border">
      <table className="border-collapse divide-y border-none">
        <thead className="font-bold">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border-none">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-t-1 border-b-1 bg-gray-800">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
