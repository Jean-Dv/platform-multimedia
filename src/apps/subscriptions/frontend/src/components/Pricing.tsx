import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";


enum PopularPlanType {
    NO = 0,
    YES = 1,
}

interface PricingProps {
    id?: string;
    title: string;
    price: number;
    description: string;
    duration: number;
}

const pricingList: PricingProps[] = [
    {
        id: "",
        title: "Basic",
        price: 1,
        description:
            "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        duration: 30,
    },
    {
        id: "",
        title: "Pro",
        price: 5,
        description:
            "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        duration: 90,
    },
    {
        id: "",
        title: "Pro Plus",
        price: 40,
        description:
            "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        duration: 365,
    },
]

export function Pricing() {
    const [isLoading, setIsLoading] = useState(true)
    const [plans, setPlans] = useState<PricingProps[]>([])
    let token = ""
    if (typeof window !== undefined) {
        token = window.localStorage.getItem("token") as string
    }
    useEffect(() => {
        fetch("http://localhost:8000/api/v1/subscriptions/plans", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then(({ data, ok }: { data: PricingProps[], ok: boolean }) => {
                setPlans(data)
                setIsLoading(false)
            });
    }, [])

    return (
        <section
            id="pricing"
            className="container py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center">
                Get
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                    Unlimited{" "}
                </span>
                Access
            </h2>
            <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                reiciendis.
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((pricing: PricingProps) => (
                    <form key={pricing.id}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex item-center justify-between">
                                    {pricing.title}
                                </CardTitle>
                                <div>
                                    <span className="text-3xl font-bold">${pricing.price}</span>
                                    <span className="text-muted-foreground"> /month</span>
                                </div>

                                <CardDescription>{pricing.description}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-4">
                                    {pricing.duration}
                                </div>

                            </CardContent>

                            <hr className="w-4/5 m-auto mb-4" />

                            <CardFooter className="flex">
                                <Button className="w-full">Subscribe</Button>
                            </CardFooter>
                        </Card>
                    </form>
                ))}
            </div>
        </section>
    );
};