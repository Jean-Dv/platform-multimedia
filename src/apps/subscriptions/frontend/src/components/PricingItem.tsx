"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { PricingProps } from "@/types";

export default function PricingItem({ id, duration, description, price, title }: PricingProps) {
    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const response = await fetch("/api/mercadopago", {
            method: "POST",
            body: JSON.stringify({
                id,
                title,
                price,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const { sandbox_init_point } = await response.json()
        window.location.href = sandbox_init_point
    }
    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle className="flex item-center justify-between">
                    {title}
                </CardTitle>
                <div>
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground"> /month</span>
                </div>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {duration}
                </div>

            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
                <Button className="w-full" onClick={handleSubmit}>Subscribe</Button>
            </CardFooter>
        </Card>
    )
}