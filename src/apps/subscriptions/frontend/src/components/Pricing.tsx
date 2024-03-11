"use client";
import { PricingProps } from "@/types";
import PricingItem from "./PricingItem";
import useFetch from "@/hooks/useFetch";

export default function Pricing() {
    let token = ""
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem("token") as string
    }

    const { data: plans, isLoading } = useFetch<PricingProps[]>("http://localhost:8000/api/v1/subscriptions/plans", token)

    if (isLoading) return <p>Loading...</p>


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
                {plans!.map((pricing: PricingProps) => (
                    <PricingItem key={pricing.id} {...pricing} token={token} />
                ))}
            </div>
        </section>
    );
};