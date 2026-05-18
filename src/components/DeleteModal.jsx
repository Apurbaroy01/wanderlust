'use client'

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function DeleteModal({ details }) {

    const router = useRouter();

    const handleDelete = async () => {

        try {

            const res = await fetch(
                `http://localhost:5000/bookings/${details._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            console.log(data);

            router.refresh();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AlertDialog>

            <Button
                className="text-red-500 rounded-none"
                variant="outline"
            >
                <TrashBin /> Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>

                    <AlertDialog.Dialog className="sm:max-w-[400px]">

                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>

                            <AlertDialog.Icon status="danger" />

                            <AlertDialog.Heading>
                                Delete destination permanently?
                            </AlertDialog.Heading>

                        </AlertDialog.Header>

                        <AlertDialog.Body>

                            <p>
                                This will permanently delete{" "}
                                <strong>
                                    {details.destinationName}
                                </strong>
                            </p>

                        </AlertDialog.Body>

                        <AlertDialog.Footer>

                            <Button
                                slot="close"
                                variant="tertiary"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleDelete}
                                slot="close"
                                variant="danger"
                            >
                                Delete
                            </Button>

                        </AlertDialog.Footer>

                    </AlertDialog.Dialog>

                </AlertDialog.Container>
            </AlertDialog.Backdrop>

        </AlertDialog>
    );
}