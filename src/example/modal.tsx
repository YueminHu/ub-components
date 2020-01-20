import * as React from "react";
import Button from "../button";
import GenericModal from "../modal/generic";
import DialogModal from "../modal/dialog";
import LoadingModal from "../modal/loading";
import Section from "./section";

interface Props {}

const Modals = (prop: Props) => {
  const [generic_modal, set_generic_modal] = React.useState(false);
  const [bounce_modal, set_bounce_modal] = React.useState(false);
  const [dialog_modal, set_dialog_modal] = React.useState(false);
  const [loading_modal, set_loading_modal] = React.useState(false);

  return (
    <Section title="Modals">
      <div>
        <p>
          Generic Modal<Button onClick={() => set_generic_modal(!generic_modal)}>Toggle</Button>
        </p>
        <p>
          Generic Modal - Bounce <Button onClick={() => set_bounce_modal(!bounce_modal)}>Toggle</Button>
        </p>
        <p>
          Dialog Modal With Promise<Button onClick={() => set_dialog_modal(!dialog_modal)}>Toggle</Button>
        </p>
        <p>
          Loading Modal
          <Button
            onClick={() => {
              set_loading_modal(true);
              setTimeout(() => set_loading_modal(false), 2000);
            }}
          >
            Toggle
          </Button>
        </p>
      </div>
      <GenericModal show={generic_modal} dismiss={() => set_generic_modal(false)}>
        THis is Generic Modal
      </GenericModal>
      <GenericModal show={bounce_modal} dismiss={() => set_bounce_modal(false)} easing="bounce"></GenericModal>
      <DialogModal
        show={dialog_modal}
        dismiss={() => set_dialog_modal(false)}
        onOk={(e, dismiss) => new Promise(res => setTimeout(res, 1000)).then(() => console.log("executed!"))}
      >
        <div>This is Dialog Modal!</div>
      </DialogModal>
      <LoadingModal show={loading_modal} dismiss={() => set_loading_modal(false)}></LoadingModal>
    </Section>
  );
};

export default Modals;
