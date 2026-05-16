"use client";
import {Calendar} from "@gravity-ui/icons";
import {DateField, Label} from "@heroui/react";


const BookingCard = ({ destination }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Booking Card</h2>
            <p>{destination.price} per person</p>
            <DateField className="w-[256px]" name="date">
                <Label>Date<spnan className="text-red-500">*</spnan></Label>
                <DateField.Group>
                    <DateField.Prefix>
                        <Calendar className="size-4 text-muted" />
                    </DateField.Prefix>
                    <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                </DateField.Group>
            </DateField>
            <div className="flex w-full gap-2">
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default BookingCard;