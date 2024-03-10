import  { MercadoPagoConfig, Preference } from "mercadopago"
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { NextResponse } from "next/server";

async function createPreference({ id, title, price}: { id: string, title: string, price: string}): Promise<PreferenceResponse> {
    const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    })
    const preference = await new Preference(client).create({
        body: {
            items: [
                {
                    id,
                    title,
                    quantity: 1,
                    unit_price: Number(price),
                }
            ]
        }
    })
    return preference
}


export async function POST(
    req: Request
) {

    const data = await req.json();
    const { id, title, price } = data;
    const preference = await createPreference({ id, title, price });
    return NextResponse.json({
        sandbox_init_point: preference.sandbox_init_point,
    })
}