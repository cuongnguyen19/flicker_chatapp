"use client";
import { useRouter } from "next/navigation";
import { Empty } from "@/shared/components/empty";
import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { connect } from "react-redux";
import {setState} from "@/redux/slices/router";

type Props = {
  currentId: number | null;
};

const page = ({ currentId }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const authorized = localStorage.getItem("authorizedForArchived");
    if(authorized !== "true") {
      router.push("/chat");
    }
    else if (currentId !== null) router.push(`/archivedChat/${currentId}`);
  }, [currentId]);

  return <Empty text="No information shown" />;
};

const mapState = ({ chat }: RootState) => ({
  currentId: chat.currentId,
});

export default connect(mapState)(page);
