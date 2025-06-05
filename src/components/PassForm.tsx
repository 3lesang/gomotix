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
  password: z.string(),
});

export type PassFormValues = z.infer<typeof formSchema>;

interface PassFormProps {
  onSubmit?: (values: PassFormValues) => void;
}

export default function PassForm({ onSubmit }: PassFormProps) {
  const form = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: PassFormValues) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="New Room" {...field} type="password" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Enter the password to join the room.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
    </Form>
  );
}
