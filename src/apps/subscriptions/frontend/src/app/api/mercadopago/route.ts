import  { MercadoPagoConfig, Preference } from "mercadopago"
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

async function createPreference({ id, name, price, duration, token}: { id: string, name: string, duration: number, price: string, token: string}): Promise<PreferenceResponse> {
    const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    })
    const tokenJwt = jwt.decode(token, { complete: true })
    const { userId } = tokenJwt?.payload as { userId: string; roleId: string }
    const descriptionJson = {
        duration,
        userId
    }
    const description = JSON.stringify(descriptionJson)
    const preference = await new Preference(client).create({
        body: {
            items: [
                {
                    id,
                    title: name,
                    quantity: 1,
                    unit_price: Number(price),
                    description
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
    const { id, name, price, duration, token } = data;
    const preference = await createPreference({ id, name, price, duration, token });
    return NextResponse.json({
        sandbox_init_point: preference.sandbox_init_point,
    })
}