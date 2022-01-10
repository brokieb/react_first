import axiosInstance from "../../../../app/lib/axiosInstance";
import AuctionEditorForm from "../../../../app/components/elements/forms/admin/auctions/auctionEditorForm";
import Loading from "../../../../app/components/layout/loading";
import { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignLeft,
  faGrimace,
  faImage,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function AuctionDescriptionCardButtons({
  sectionState,
  sectionKey,
}) {
  return (
    <ButtonGroup className="me-2" aria-label="First group">
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        variant="success"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray.splice(sectionKey + 1, 0, {
              items: [],
            });

            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center bg-danger"
        variant="danger"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray.splice(sectionKey, 1);

            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray[sectionKey] = {
              items: [{ type: "IMAGE", url: "" }],
            };
            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faImage} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray[sectionKey] = {
              items: [{ type: "TEXT", content: "tekst..." }],
            };
            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray[sectionKey] = {
              items: [
                { type: "IMAGE", url: "" },
                { type: "TEXT", content: "tekst..." },
              ],
            };
            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faImage} />
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray[sectionKey] = {
              items: [
                { type: "TEXT", content: "tekst..." },
                { type: "IMAGE", url: "" },
              ],
            };
            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
        <FontAwesomeIcon icon={faImage} />
      </Button>
      <Button
        size="sm"
        className="d-flex gap-1 align-items-center"
        onClick={() => {
          sectionState((prev) => {
            let newArray = [...prev];
            newArray[sectionKey] = {
              items: [
                { type: "TEXT", content: "tekst..." },
                { type: "TEXT", content: "tekst..." },
              ],
            };
            return newArray;
          });
        }}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
    </ButtonGroup>
  );
}
