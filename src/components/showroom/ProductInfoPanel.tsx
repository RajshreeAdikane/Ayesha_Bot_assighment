import { X, FileText, Download, ExternalLink } from "lucide-react";
import { Product } from "@/types/showroom";

interface ProductInfoPanelProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductInfoPanel = ({ product, onClose }: ProductInfoPanelProps) => {
  if (!product) return null;

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-80 md:w-[420px] animate-scale-in">
      <div className="glass-panel-glow p-6 space-y-5 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: product.color }}
              />
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                {product.category}
              </p>
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors flex-shrink-0"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-4 rounded-full" style={{ backgroundColor: product.color }} />
            Key Features
          </h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li 
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: product.color }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-4 rounded-full" style={{ backgroundColor: product.color }} />
            Technical Specifications
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div 
                key={key}
                className="bg-secondary/30 rounded-lg p-3 border border-border/30"
              >
                <p className="text-xs text-muted-foreground mb-0.5">{key}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button className="btn-primary-glow w-full flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            Download Datasheet
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="px-4 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              3D Model
            </button>
            <button className="px-4 py-2.5 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">Certified:</span>
          <div className="flex gap-1">
            {["ISO 14120", "CE", "OSHA"].map((cert) => (
              <span 
                key={cert}
                className="px-2 py-0.5 text-[10px] rounded bg-secondary/50 text-muted-foreground font-medium"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
