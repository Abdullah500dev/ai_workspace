import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type DocumentViewerProps = {
  document: {
    id: string;
    content: string;
    metadata: Record<string, any>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
};

export function DocumentViewer({ document, isOpen, onClose }: DocumentViewerProps) {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{document.metadata?.source || 'Document Details'}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto p-6 bg-muted/20 rounded-lg">
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {document.content}
            </pre>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            <span className="font-medium">ID:</span> {document.id}
          </div>
          <div className="space-x-4">
            <span>
              <span className="font-medium">Words:</span> {Math.ceil(document.content.length / 5)}
            </span>
            <span>
              <span className="font-medium">Chars:</span> {document.content.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
