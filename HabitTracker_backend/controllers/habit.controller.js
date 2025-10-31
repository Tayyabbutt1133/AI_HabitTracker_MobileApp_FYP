import { StatusCodes } from 'http-status-codes'
import Groq from 'groq-sdk';
import { prisma } from '../utils/prisma.js'


export async function postHabit(req, res) {

    const { habit_name, description, frequency, askAI, Id } = req.body;
    const userId = parseInt(Id);

    if (!habit_name || !description || !frequency || !askAI) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Something is Missing !"
        });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    try {
        const AIResponse = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant. Always respond with a *short, clear suggestion making it very human oriented that connects with human* (1-6 sentences max)."
                },
                {
                    role: "user",
                    content: `Give a small suggestion about this habit:\n"${askAI}"`,
                },
            ],
            model: "llama-3.1-8b-instant",
        });
        const AIsuggestions = AIResponse.choices?.[0]?.message?.content || "No suggestion found";
        const habit_save_response = await prisma.habits.create({
            data: {
                habit_name,
                description,
                frequency,
                askAI,
                userId,
                AIsuggestions,
            }
        })
        return res.status(StatusCodes.OK).json({
            message: "everything working fine",
            data: habit_save_response,
        });

    } catch (error) {
        console.error("AI Integration Error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "AI request failed",
        });
    }


}


export async function getHabitbyUserId(req, res) {

    const userid = parseInt(req.params.userId);

    const habits = await prisma.habits.findMany({
        where: {
            userId: userid
        }
    })

    return res.status(StatusCodes.OK).json({
        habits
    })
}

export async function getHabitDetailById(req, res) {
    try {
        const habit_id = parseInt(req.params.habitId);

        console.log("Habit received at server:", habit_id);
        const habit = await prisma.habits.findUnique({
            where: { id: habit_id },
        });
        console.log("All habit details : ", habit);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        return res.json({
            message: "Success",
            data: habit,
        });
    } catch (error) {
        console.error("Error fetching habit:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateHabit(req, res) {
    try {
        const habitId = Number(req.params.habitId);
        const { habit_name, description, frequency, askAI, AIsuggestions } = req.body;

        if (!habitId || isNaN(habitId)) {
            return res.status(400).json({ message: "Invalid habit ID" });
        }

        const existingHabit = await prisma.habits.findUnique({
            where: { id: habitId },
            select: { AIsuggestions: true },
        });

        if (!existingHabit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        let updatedSuggestion = AIsuggestions;

        if (AIsuggestions !== existingHabit.AIsuggestions) {
            try {
                const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
                const AIResponse = await groq.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant. Respond with a short, clear, human-oriented suggestion (1–6 sentences).",
                        },
                        {
                            role: "user",
                            content: `Give a small suggestion about this habit:\n"${askAI}"`,
                        },
                    ],
                    model: "llama-3.1-8b-instant",
                });

                updatedSuggestion = AIResponse.choices?.[0]?.message?.content || "No suggestion found";
            } catch (error) {
                console.error("AI generation failed:", error);
                updatedSuggestion = "Could not generate AI suggestion.";
            }
        }

        const updatedHabit = await prisma.habits.update({
            where: { id: habitId },
            data: {
                habit_name,
                description,
                frequency,
                askAI,
                AIsuggestions: updatedSuggestion,
            },
        });

        return res.json({
            success: true,
            message: "Habit updated successfully",
        });
    } catch (error) {
        console.error("Error updating habit:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteHabitById(req, res) {
    try {
        const habit_id = parseInt(req.params.habitId);

        await prisma.habits.delete({
            where: { id: habit_id },
        });

        return res.json({
            message: "Habit deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting habit:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}