import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  password: z.string().optional(),
  isPrivate: z.boolean().default(false),
  isPublic: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewGameForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
      isPrivate: false,
      isPublic: true,
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    console.log("Room Name:", values.name);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input placeholder="New Room" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                This will be your public display name in the game room.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password (optional)</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Set a password if you want to make the room private.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enter Room
        </Button>
      </form>
    </Form>
  );
}
