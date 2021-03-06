import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSubscriptionsUseCase } from "./CreateSubscriptionsUseCase";

interface IFiles {
    filename: string;
    }

class CreateSubscriptionsController {

    async handle(request: Request ,response: Response): Promise<void>{

        const { 
            date,
            hour,
            topic,
            age_sick,
            gender_sick,
            name_sick 
        } = request.body

        const { id: user_id } = request.user

        const createSubscriptionsUseCase = container.resolve(CreateSubscriptionsUseCase)

        await createSubscriptionsUseCase.execute({
            date,
            hour,
            topic,
            user_id,
            age_sick,
            gender_sick,
            name_sick
        })

        return response.status(201).redirect('user-profile')
    }
}

export { CreateSubscriptionsController }