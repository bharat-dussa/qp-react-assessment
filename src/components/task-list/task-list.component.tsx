import { Empty, Flex, Skeleton } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { useState } from "react";
import { AutoSizer, InfiniteLoader, List } from "react-virtualized";
import { appConstants } from "../../constants/app.constant";
import { ITask } from "../../types/common.interface";
import TaskItem from "../task-item/task-item.component";

interface ITodoList {
  tasks: ITask[];
  toggleTask: (event: CheckboxChangeEvent, index: number) => void;
}

const TodoList: React.FC<ITodoList> = ({ tasks, toggleTask }) => {
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [loadedRowCount, setLoadedRowCount] = useState<number>(20);

  const loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => {
    if (isLoadingMore) {
      return Promise.resolve();
    }

    setIsLoadingMore(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLoadedRowCount(stopIndex + 1);
        setIsLoadingMore(false);
        resolve();
      }, 1000);
    });
  };

  const isRowLoaded = ({ index }: { index: number }) => index < loadedRowCount;

  const rowRenderer = ({ index, key, style }: any) => {
    const todo = tasks[index];
    return (
      todo && (
        <div key={key} style={style}>
          <Skeleton
            data-testid="todo-skeleton"
            loading={isLoadingMore}
            avatar={{ shape: "square", size: "small" }}
            paragraph={{ rows: 0 }}
          >
            <TaskItem task={todo} index={index} toggleTask={toggleTask} />
          </Skeleton>
        </div>
      )
    );
  };

  return (
    <Flex
      justify="start"
      align="center"
      className="todo_container"
      style={{ marginTop: "2rem" }}
    >
      {tasks?.length > 0 ? (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isRowLoaded={isRowLoaded}
              loadMoreRows={loadMoreRows}
              rowCount={tasks.length + 1}
              threshold={7}
              minimumBatchSize={10}
            >
              {({ onRowsRendered, registerChild }) => (
                <List
                  data-testid="list"
                  ref={registerChild}
                  height={300}
                  width={1000}
                  rowCount={tasks.length + 1}
                  rowHeight={50}
                  rowRenderer={rowRenderer}
                  onRowsRendered={onRowsRendered}
                />
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      ) : (
        <Empty
          data-testid="no-todos"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<p>{appConstants.label["no-todos"]}</p>}
        />
      )}
    </Flex>
  );
};

export default TodoList;
