"use client";
import { Box, Button, Flex, Spinner, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import classNames from "classnames";
import { BiSolidRightArrow } from "react-icons/bi";
const RunCode = ({ code }: { code: string }) => {
  const [outPut, setOutPut] = useState(
    "Click on the green button too show the output"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getCode = () => {
    setIsLoading(true);
    const data = {
      code: btoa(code),
    };
    console.log(data);
    fetch("https://execjs.emilfolino.se/code", {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        setIsLoading(false);
        if (atob(result.data).includes("Command failed")) {
          setError(true);
        } else {
          setError(false);
        }
        setOutPut(atob(result.data));
      })
      .catch((_err) => {
        setError(true);
        setIsLoading(false);
      });
  };
  return (
    <Box className="h-full  text-white bg-[#333]">
      <Flex
        justify="between"
        p="2"
        className={classNames("border-b-2", {
          "border-red-600": error,
          "border-green-500": !error,
        })}
        direction={{ initial: "column", xs: "row" }}
      >
        <Text>Output</Text>
        <Button
          size={{ initial: "1", xs: "2" }}
          disabled={isLoading}
          color="green"
          onClick={getCode}
          className="!max-w-[60px]"
        >
          <BiSolidRightArrow />
          {isLoading && <Spinner size="3" className="!text-green-400" />}
        </Button>
      </Flex>
      <Box
        className={classNames(
          "mt-2 px-1.5 rounded-md font-mono text-sm whitespace-pre-wrap",
          {
            "text-red-500": error,
            "text-white": !error,
          }
        )}
      >
        {error ? "Error running code:\n" + outPut : outPut}
      </Box>
    </Box>
  );
};

export default RunCode;
